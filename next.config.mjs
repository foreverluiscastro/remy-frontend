/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/signup',
        destination: 'https://remy-api.fly.dev/signup',
      },
      {
        source: '/login',
        destination: 'https://remy-api.fly.dev/login',
      },
      {
        source: '/me',
        destination: 'https://remy-api.fly.dev/me'
      },
      {
        source: '/logout',
        destination: 'https://remy-api.fly.dev/logout'
      },
      {
        source: '/recipes',
        destination: 'https://remy-api.fly.dev/recipes'
      },
      {
        source: '/recipes/:id',
        destination: 'https://remy-api.fly.dev/recipes/:id'
      },
      {
        source: '/saved_recipes',
        destination: 'https://remy-api.fly.dev/saved_recipes'
      },
      {
        source: '/saved_recipes/:id',
        destination: 'https://remy-api.fly.dev/saved_recipes/:id'
      },
      {
        source: '/generate_recipe',
        destination: 'https://remy-api.fly.dev/generate_recipe',
      }
    ];
  },
};

export default nextConfig;
