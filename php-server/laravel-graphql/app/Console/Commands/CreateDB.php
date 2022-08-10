<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class CreateDB extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

        $key = 'database.connections.pgsql.';
        $schema = config($key . 'database');
        $host = config($key . 'host');
        $port = config($key . 'port');
        $user = config($key . 'username');
        $pass = config($key . 'password');

        try {

            $db = new \PDO("pgsql:host=$host;port=$port", $user, $pass);
            $test = $db->exec("CREATE DATABASE \"$schema\";");

            if ($test === false) {
                throw new \Exception($db->errorInfo()[2]);

            }
            $this->info(sprintf('Successfully created %s database', $schema));

        }
        catch (\Exception $exception) {

            $this->error(sprintf('Failed to create %s database: %s', $schema, $exception->getMessage()));

        }

        return Command::SUCCESS;
    }
}
