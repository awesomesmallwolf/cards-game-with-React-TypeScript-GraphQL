check-env-file:
	@bash -c " \
		if [ ! -f .env ]; then \
			cp .env.example.docker .env; \
		fi; \
	"

base: check-env-file

# Tasks

# SSH (bash) into server container.
# Useful for running Django shell commands.
bash: base
	docker-compose -f docker-compose.backend.yml exec uplifty bash

# SSH (bash) into database container.
# Useful for running commands directly against database.
bashdb: base
	docker-compose -f docker-compose.backend.yml exec db bash

# SSH (postgres shell) into database container.
# Useful for running postgres commands.
dbshell: base
	docker-compose -f docker-compose.backend.yml exec db psql -U postgres

# Drop the local database.
cleandb: base
	docker-compose -f docker-compose.backend.yml exec db psql -h db -U postgres -c "DROP DATABASE IF EXISTS uplifty"

# Build docker containers. Pass --no-cache to force re-downloading of images.
# See build --help for additional info
fullstack-python-build: base
	docker-compose -f docker-compose.frontend.yml -f docker-compose.backend.yml build $(ARGS)

# Start docker containers.
# See up --help for additional info
fullstack-python-start: base
	docker-compose -f docker-compose.frontend.yml -f docker-compose.backend.yml up $(ARGS)

# Stop docker containers.
fullstack-python-stop: base
	docker-compose -f docker-compose.frontend.yml -f docker-compose.backend.yml stop

# Build docker containers. Pass --no-cache to force re-downloading of images.
# See build --help for additional info
frontend-build: base
	docker-compose -f docker-compose.frontend.yml build $(ARGS)

# Start docker containers.
# See up --help for additional info
frontend-start: base
	docker-compose -f docker-compose.frontend.yml up $(ARGS)

# Stop docker containers.
frontend-stop: base
	docker-compose -f docker-compose.frontend.yml stop

# Opens a shell in the running frontend container. Useful for installing packages.
frontend-bash: base
	docker-compose -f docker-compose.frontend.yml exec uplifty-frontend bash

# Build docker containers. Pass --no-cache to force re-downloading of images.
# See build --help for additional info
python-build: base
	docker-compose -f docker-compose.backend.yml build $(ARGS)

# Start docker containers.
# See up --help for additional info
python-start: base
	docker-compose -f docker-compose.backend.yml up $(ARGS)

# Stop docker containers.
python-stop: base
	docker-compose -f docker-compose.backend.yml stop

# Remove docker containers (if they exist)
# Run this with --rmi all to remove the mysql image too
python-clean: base
	docker-compose -f docker-compose.backend.yml down --rmi local

# SSH (bash) into server container.
# Useful for running Django shell commands.
python-shell: base
	docker-compose -f docker-compose.backend.yml exec -T uplifty python manage.py shell

# Install package, e.g. make python-install-venv ARGS='--dev django_extensions'
python-install-venv: base
	@echo WARNING - Any packages installed will be lost after the container shuts down. To persist changes, rebuild the docker image.
	docker-compose -f docker-compose.backend.yml exec -T uplifty poetry install $(ARGS)

# Lint server code automatically with black and autoflake
# WARNING: This updates files in-place.   
python-lint: base
	docker-compose -f docker-compose.backend.yml exec -T uplifty black /code/server
	docker-compose -f docker-compose.backend.yml exec -T uplifty isort /code/server
	docker-compose -f docker-compose.backend.yml exec -T uplifty autoflake . --in-place --recursive --remove-all-unused-imports --remove-duplicate-keys --remove-unused-variables
	@bash -c "\
		if ! git diff-index --quiet HEAD --; then\
			echo 'Changes made. See git diff';\
			exit 1;\
		fi;\
	"

# Check server code automatically with black and autoflake
# WARNING: This updates files in-place.
python-lint-check: base
	docker-compose -f docker-compose.backend.yml exec -T uplifty black /code/server
	docker-compose -f docker-compose.backend.yml exec -T uplifty isort --check-only /code/server
	@bash -c "\
		if ! git diff-index --quiet HEAD --; then\
			echo 'Changes made. See git diff';\
			exit 1;\
		fi;\
	"
	
python-flake8-and-manage-py-check: base
	docker-compose -f docker-compose.backend.yml exec -T uplifty flake8 uplifty/ tests/
	docker-compose -f docker-compose.backend.yml exec -T uplifty python manage.py check
	
# Security vulnerability checks
# Check packages
python-security-check: base
	docker-compose -f docker-compose.backend.yml exec -T uplifty poetry run safety check
	# Check files, except tests. See also server/.bandit config
	docker-compose -f docker-compose.backend.yml exec -T uplifty bandit -r server
	
# Run database migrations.
python-makemigrations: base
	docker-compose -f docker-compose.backend.yml exec -T uplifty python manage.py makemigrations $(ARGS)
        
# Migrate database.
python-migrate: base
	docker-compose -f docker-compose.backend.yml exec -T uplifty python manage.py migrate $(ARGS)
        
# Run database migrations.
python-migrations-and-fixtures: base
	docker-compose -f docker-compose.backend.yml exec -T uplifty python manage.py migrate
	docker-compose -f docker-compose.backend.yml exec -T uplifty python manage.py makemigrations --check
        
# Run database migrations.
python-schema: base
	docker-compose -f docker-compose.backend.yml exec -T uplifty python manage.py graphql_schema --schema uplifty.schema.schema --out schema.json
	
# Run backend tests
python-test: base
	echo "Running tests with cache (use --cache-clear otherwise)..."
	docker-compose -f docker-compose.backend.yml exec -T uplifty pytest $(ARGS)
	

# Build docker containers. Pass --no-cache to force re-downloading of images.
# See build --help for additional info
php-build: base
	docker-compose -f docker-compose.php.yml build $(ARGS)

# Start docker containers.
# See up --help for additional info
php-start: base
	docker-compose -f docker-compose.php.yml up $(ARGS)

# Stop docker containers.
php-stop: base
	docker-compose -f docker-compose.php.yml stop

# Remove docker containers (if they exist)
# Run this with --rmi all to remove the Postgres image too
php-clean: base
	docker-compose -f docker-compose.php.yml down --rmi local -v

php-test: base
	echo "Running tests on PHP... this might take a while due to test repetition"
	docker-compose -f docker-compose.php.yml run \
		--rm \
		--name uplifty-test \
		uplifty \
		/bin/bash /scripts/test.sh

help:
	@echo  ''
	@echo  ' Targets:'
	@echo  ''
	@echo  '  bash           			- SSH (bash) into server container.'
	@echo  '  bashdb                	- SSH (bash) into database container.'
	@echo  '  dbshell    				- SSH (postgres shell) into database container.'
	@echo  '  cleandb      				- Drop the local database.'
	@echo  '  fullstack-python-build    - Build docker containers. Pass --no-cache to force re-downloading of images.'
	@echo  '  fullstack-python-start    - Start docker containers.'
	@echo  '  fullstack-python-stop     - Stop docker containers'
	@echo  '  frontend-build     		- Build docker containers. Pass --no-cache to force re-downloading of images.'
	@echo  '  frontend-start    		- Start docker containers.'
	@echo  '  frontend-stop     		- Stop docker containers.'
	@echo  '  frontend-bash             - Opens a shell in the running frontend container. Useful for installing packages.'
	@echo  '  python-build      		- Build docker containers. Pass --no-cache to force re-downloading of images.'
	@echo  '  python-start				- Start docker containers.'
	@echo  '  python-stop     			- Stop docker containers.'
	@echo  '  python-clean    			- Remove docker containers (if they exist)'
	@echo  '  python-shell     			- SSH (bash) into server container.'
	@echo  '  python-install-venv		- Install package, e.g. make python-install-venv ARGS="--dev django_extensions"'
	@echo  '  python-lint				- Lint server code automatically with black and autoflake'
	@echo  '  python-lint-check			- Check server code automatically with black and autoflake'
	@echo  '  python-security-check		- Security vulnerability checks'
	@echo  '  python-makemigrations		- Run database migrations.'
	@echo  '  python-migrate			- Migrate database.'
	@echo  '  python-test				- Run backend tests'
	@echo  '  php-build					- Build docker containers. Pass --no-cache to force re-downloading of images.'
	@echo  '  php-start					- Start docker containers.'
	@echo  '  php-Stop					- Stop docker containers.'
	@echo  '  php-clean					- Remove docker containers (if they exist)'
