<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role = Role::firstOrCreate(['name' => 'super_admin']);
        $user = User::create([
            'username' => 'admin',
            'email' => 'admin@admin.com',
            'password' => 'mot de passe',
        ]);

        $user->assignRole($role);
    }
}
