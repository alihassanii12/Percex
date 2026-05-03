import type { Metadata } from 'next';
import { PAGE_SEO } from '@/app/lib/constants';
import { generateMetadata, generateCanonicalUrl } from '@/app/lib/seo';
import { Layout } from '@/app/components/layout';
import { SectionHeader, Button, Card } from '@/app/components/ui';

// Metadata for SEO
export const metadata: Metadata = generateMetadata({
  title: PAGE_SEO.blog.title,
  description: PAGE_SEO.blog.description,
  canonical: generateCanonicalUrl('/blog'),
  openGraph: {
    title: PAGE_SEO.blog.title,
    description: PAGE_SEO.blog.description,
    type: 'website',
    url: generateCanonicalUrl('/blog'),
  },
});

// Sample blog posts data
const BLOG_POSTS = [
  {
    id: 'ecommerce-trends-2024',
    title: 'E-commerce Trends to Watch in 2024',
    excerpt: 'Discover the latest trends shaping the e-commerce landscape and how they can impact your online business strategy.',
    author: 'Ahmad',
    publishedAt: '2024-01-15',
    readTime: '5 min read',
    category: 'E-commerce',
    tags: ['E-commerce', 'Trends', 'Business Strategy'],
    featured: true,
  },
  {
    id: 'nextjs-performance-optimization',
    title: 'Next.js Performance Optimization: A Complete Guide',
    excerpt: 'Learn advanced techniques to optimize your Next.js applications for better performance and user experience.',
    author: 'Ahmad',
    publishedAt: '2024-01-10',
    readTime: '8 min read',
    category: 'Development',
    tags: ['Next.js', 'Performance', 'Web Development'],
    featured: false,
  },
  {
    id: 'ux-design-principles',
    title: 'Essential UX Design Principles for E-commerce Success',
    excerpt: 'Explore the fundamental UX design principles that can significantly improve your e-commerce conversion rates.',
    author: 'Ahmad',
    publishedAt: '2024-01-05',
    readTime: '6 min read',
    category: 'Design',
    tags: ['UX Design', 'E-commerce', 'Conversion'],
    featured: false,
  },
  {
    id: 'web-accessibility-guide',
    title: 'Building Accessible Websites: A Developer\'s Guide',
    excerpt: 'A comprehensive guide to implementing web accessibility best practices in your development workflow.',
    author: 'Ahmad',
    publishedAt: '2023-12-28',
    readTime: '10 min read',
    category: 'Development',
    tags: ['Accessibility', 'Web Development', 'WCAG'],
    featured: false,
  },
  {
    id: 'seo-for-ecommerce',
    title: 'SEO Strategies for E-commerce Websites',
    excerpt: 'Boost your online store\'s visibility with proven SEO strategies specifically designed for e-commerce platforms.',
    author: 'Ahmad',
    publishedAt: '2023-12-20',
    readTime: '7 min read',
    category: 'Marketing',
    tags: ['SEO', 'E-commerce', 'Digital Marketing'],
    featured: false,
  },
  {
    id: 'react-best-practices',
    title: 'React Best Practices for Scalable Applications',
    excerpt: 'Learn the best practices for building maintainable and scalable React applications that stand the test of time.',
    author: 'Ahmad',
    publishedAt: '2023-12-15',
    readTime: '9 min read',
    category: 'Development',
    tags: ['React', 'Best Practices', 'Scalability'],
    featured: false,
  },
];

const CATEGORIES = ['All', 'E-commerce', 'Development', 'Design', 'Marketing'];

// Format date for display
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Blog Page Component
export default function BlogPage() {
  const featuredPost = BLOG_POSTS.find(post => post.featured);
  const regularPosts = BLOG_POSTS.filter(post => !post.featured);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-spacing-xl pt-32">
        <div className="container-xl">
          <SectionHeader
            subtitle="Our Blog"
            title="Insights, tips, and industry expertise"
            description="Stay updated with the latest trends in web development, e-commerce, and digital strategy through our expert insights and practical guides."
            alignment="center"
            className="mb-16"
          />
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="section-spacing-md">
          <div className="container-xl">
            <div className="mb-8">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-satoshi font-medium bg-electric-blue/10 text-electric-blue">
                Featured Post
              </span>
            </div>
            
            <Card variant="default" className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Featured Post Image */}
                <div className="h-64 lg:h-auto bg-gradient-to-br from-electric-blue/20 to-slate-blue/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-electric-blue/30 rounded-3xl flex items-center justify-center mx-auto mb-4">
                      <div className="w-10 h-10 bg-electric-blue rounded-2xl" />
                    </div>
                    <p className="font-satoshi text-muted-steel">
                      Featured Article
                    </p>
                  </div>
                </div>

                {/* Featured Post Content */}
                <div className="p-8 lg:p-12">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-xs font-satoshi font-medium text-electric-blue bg-electric-blue/10 px-3 py-1 rounded-full">
                      {featuredPost.category}
                    </span>
                    <span className="text-xs font-satoshi text-muted-steel">
                      {formatDate(featuredPost.publishedAt)}
                    </span>
                  </div>

                  <h2 className="font-cabinet-grotesk font-bold text-2xl lg:text-3xl text-soft-gray mb-4">
                    {featuredPost.title}
                  </h2>

                  <p className="font-satoshi text-muted-steel leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-electric-blue/20 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-electric-blue rounded-full" />
                      </div>
                      <div>
                        <p className="font-satoshi font-medium text-soft-gray text-sm">
                          {featuredPost.author}
                        </p>
                        <p className="font-satoshi text-muted-steel text-xs">
                          {featuredPost.readTime}
                        </p>
                      </div>
                    </div>

                    <Button variant="primary" size="sm">
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="section-spacing-md">
        <div className="container-xl">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className="px-6 py-3 rounded-lg font-satoshi font-medium transition-all duration-200 bg-slate-blue/10 text-muted-steel hover:bg-slate-blue/20 hover:text-soft-gray"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-spacing-lg">
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} variant="default" className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                {/* Post Image */}
                <div className="h-48 bg-gradient-to-br from-slate-blue/20 to-electric-blue/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-electric-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <div className="w-8 h-8 bg-electric-blue rounded-xl" />
                    </div>
                    <p className="font-satoshi text-sm text-muted-steel">
                      {post.category} Article
                    </p>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  {/* Post Meta */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-satoshi font-medium text-electric-blue bg-electric-blue/10 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs font-satoshi text-muted-steel">
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>

                  {/* Post Title */}
                  <h3 className="font-cabinet-grotesk font-bold text-xl text-soft-gray mb-3 group-hover:text-electric-blue transition-colors duration-200">
                    {post.title}
                  </h3>

                  {/* Post Excerpt */}
                  <p className="font-satoshi text-muted-steel text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  {/* Post Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-electric-blue/20 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-electric-blue rounded-full" />
                      </div>
                      <div>
                        <p className="font-satoshi font-medium text-soft-gray text-xs">
                          {post.author}
                        </p>
                        <p className="font-satoshi text-muted-steel text-xs">
                          {post.readTime}
                        </p>
                      </div>
                    </div>

                    <Button variant="ghost" size="sm">
                      Read More
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-spacing-xl bg-slate-blue/5">
        <div className="container-xl">
          <Card variant="default" className="text-center p-12 lg:p-16">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-cabinet-grotesk font-bold text-3xl text-soft-gray mb-4">
                Stay updated with our latest insights
              </h2>
              
              <p className="font-satoshi text-muted-steel leading-relaxed mb-8">
                Subscribe to our newsletter and get the latest articles, tips, and industry insights delivered directly to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-slate-blue/10 border border-slate-blue/20 rounded-lg text-soft-gray font-satoshi placeholder-muted-steel focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-electric-blue"
                />
                <Button variant="primary" size="md" className="sm:w-auto">
                  Subscribe
                </Button>
              </div>
              
              <p className="font-satoshi text-muted-steel text-sm mt-4">
                No spam, unsubscribe at any time.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
}