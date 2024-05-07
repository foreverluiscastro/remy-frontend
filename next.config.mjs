/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/signup',
        destination: 'http://127.0.0.1:5000/signup',
      },
      {
        source: '/login',
        destination: 'http://127.0.0.1:5000/login',
      },
      {
        source: '/me',
        destination: 'http://127.0.0.1:5000/me'
      },
      {
        source: '/logout',
        destination: 'http://127.0.0.1:5000/logout'
      },
      {
        source: '/recipes',
        destination: 'http://127.0.0.1:5000/recipes'
      },
      {
        source: '/recipes/:id',
        destination: 'http://127.0.0.1:5000/recipes/:id'
      },
      {
        source: '/saved_recipes',
        destination: 'http://127.0.0.1:5000/saved_recipes'
      },
      {
        source: '/saved_recipes/:id',
        destination: 'http://127.0.0.1:5000/saved_recipes/:id'
      },
      {
        source: '/generate_recipe',
        destination: 'http://127.0.0.1:5000/generate_recipe',
      }
    ];
  },
};

export default nextConfig;
