<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    protected $model = Post::class;


    //command is php artisan tinker and Post::factory()->count(30)->create()

    public function definition()
    {
        $randomSeed = $this->faker->randomNumber();

        // Generate a unique filename for the image
        $imageFilename = "image_$randomSeed.jpg";

        // Download the placeholder image and store it in the storage directory
        $imagePath = storage_path("app/public/upload/$imageFilename");
        file_put_contents($imagePath, file_get_contents("https://picsum.photos/800/600?seed=$randomSeed"));

        return [
            'user_id' => $this->faker->numberBetween(1, 24),
            'category_id' => $this->faker->numberBetween(1, 5),
            'name' => $this->faker->text($maxNbChars = 15),
            'slug' => $this->faker->slug,
            'content' => $this->faker->text($maxNbChars = 1000),
            'image' => "$imageFilename", // Use the stored image path
        ];
    }
}
