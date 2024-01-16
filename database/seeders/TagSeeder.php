<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //\App\Models\Category::insert($this->data);
        $data = [
            [
                'name' => 'inertia js ',

                'created_at' => now(),
                'updated_at' => now(),

            ],
            [
                'name' => 'react',

                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Vue',

                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Javascript',

                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Type Script',

                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];
        Tag::insert($data);
    }
}
