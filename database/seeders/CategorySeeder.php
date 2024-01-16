<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //\App\Models\Category::insert($this->data);
        $data = [
            [
                'name' => 'PHP',
                'slug' => Str::slug('PHP language'),
                'created_at' => now(),
                'updated_at' => now(),

            ],
            [
                'name' => 'Python',
                'slug' => Str::slug('Python language'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Java',
                'slug' => Str::slug('Java language'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'C++',
                'slug' => Str::slug('C++ language'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Ruby',
                'slug' => Str::slug('Ruby language'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];
        Category::insert($data);
    }
}
