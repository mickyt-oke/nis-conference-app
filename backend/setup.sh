#!/bin/bash

echo "Setting up NIS Conference Management Laravel Backend..."

# Copy environment file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Environment file created"
fi

# Install dependencies
echo "Installing Composer dependencies..."
composer install

# Generate application key
echo "Generating application key..."
php artisan key:generate

# Generate JWT secret
echo "Generating JWT secret..."
php artisan jwt:secret

# Run migrations
echo "Running database migrations..."
php artisan migrate

# Seed database
echo "Seeding database..."
php artisan db:seed

# Clear cache
echo "Clearing cache..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear

echo "Setup complete!"
echo ""
echo "Default users created:"
echo "Admin: admin / admin123"
echo "Supervisor: supervisor / super123"
echo "User: user / user123"
echo ""
echo "Start the server with: php artisan serve"
