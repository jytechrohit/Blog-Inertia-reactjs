<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("user_id")->unsigned();
            $table->bigInteger("category_id")->unsigned();
            //$table->bigInteger("tag_id")->unsigned();
            $table->string('name');
            $table->string('slug');
            $table->text('content');
            $table->string('image')->nullable();
            $table->foreign("user_id")->references("id")->on("users");
            $table->foreign("category_id")->references("id")->on("categories");
            // $table->foreign("tag_id")->references("id")->on("tags");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
