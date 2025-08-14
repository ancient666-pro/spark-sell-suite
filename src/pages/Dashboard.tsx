import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Navigation } from '@/components/ui/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Plus, 
  DollarSign, 
  Download, 
  Star, 
  TrendingUp, 
  Package,
  ShoppingBag,
  User,
  Settings
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  preview_image_url: string;
  downloads_count: number;
  rating: number;
  review_count: number;
  is_active: boolean;
  created_at: string;
}

interface Order {
  id: string;
  amount: number;
  status: string;
  created_at: string;
  product: {
    title: string;
    category: string;
  };
}

export default function Dashboard() {
  const { user, profile, loading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [purchases, setPurchases] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalSales: 0,
    totalProducts: 0,
    averageRating: 0
  });

  useEffect(() => {
    if (user) {
      fetchSellerData();
      fetchPurchases();
    }
  }, [user]);

  const fetchSellerData = async () => {
    if (!user) return;

    // Fetch user's products
    const { data: productsData } = await supabase
      .from('products')
      .select('*')
      .eq('seller_id', user.id)
      .order('created_at', { ascending: false });

    if (productsData) {
      setProducts(productsData);
    }

    // Fetch sales orders
    const { data: ordersData } = await supabase
      .from('orders')
      .select(`
        *,
        product:products(title, category)
      `)
      .eq('products.seller_id', user.id)
      .eq('status', 'completed')
      .order('created_at', { ascending: false });

    if (ordersData) {
      setOrders(ordersData);
      
      // Calculate stats
      const totalEarnings = ordersData.reduce((sum, order) => sum + Number(order.amount), 0);
      const totalSales = ordersData.length;
      const totalProducts = productsData?.length || 0;
      const averageRating = productsData?.length 
        ? productsData.reduce((sum, p) => sum + Number(p.rating), 0) / productsData.length 
        : 0;

      setStats({
        totalEarnings,
        totalSales,
        totalProducts,
        averageRating
      });
    }
  };

  const fetchPurchases = async () => {
    if (!user) return;

    const { data: purchasesData } = await supabase
      .from('orders')
      .select(`
        *,
        product:products(title, category)
      `)
      .eq('buyer_id', user.id)
      .order('created_at', { ascending: false });

    if (purchasesData) {
      setPurchases(purchasesData);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'prompt':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'agent':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-secondary/10 text-secondary-foreground border-secondary/20';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'prompt':
        return 'AI Prompt';
      case 'agent':
        return 'n8n Agent';
      default:
        return 'Digital Good';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback>
                {profile?.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold gradient-text">
                Welcome back, {profile?.full_name || 'User'}!
              </h1>
              <p className="text-muted-foreground">
                Manage your products and track your performance
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">My Products</TabsTrigger>
            <TabsTrigger value="purchases">My Purchases</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.totalEarnings.toFixed(2)}</div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalSales}</div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Products Listed</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalProducts}</div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Sales */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p className="font-medium">{order.product.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">${Number(order.amount).toFixed(2)}</p>
                          <Badge variant="secondary" className="text-xs">
                            {getCategoryLabel(order.product.category)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No sales yet. Start selling your first product!
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Products</h2>
              <Button className="btn-primary">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="card-hover">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.preview_image_url || '/api/placeholder/400/200'}
                        alt={product.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className={getCategoryColor(product.category)}>
                          {getCategoryLabel(product.category)}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge variant={product.is_active ? "default" : "secondary"}>
                          {product.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-1">{product.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            <span>{product.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Download className="h-4 w-4" />
                            <span>{product.downloads_count}</span>
                          </div>
                        </div>
                        <div className="text-xl font-bold text-primary">
                          ${Number(product.price).toFixed(2)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="card-hover">
                <CardContent className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No products yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start selling by adding your first product to the marketplace.
                  </p>
                  <Button className="btn-primary">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Product
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="purchases" className="space-y-6">
            <h2 className="text-2xl font-bold">My Purchases</h2>

            {purchases.length > 0 ? (
              <div className="space-y-4">
                {purchases.map((purchase) => (
                  <Card key={purchase.id} className="card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{purchase.product.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Purchased on {new Date(purchase.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">${Number(purchase.amount).toFixed(2)}</p>
                          <Badge 
                            variant={purchase.status === 'completed' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {purchase.status}
                          </Badge>
                        </div>
                      </div>
                      {purchase.status === 'completed' && (
                        <div className="mt-4">
                          <Button size="sm" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="card-hover">
                <CardContent className="text-center py-12">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No purchases yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Browse our marketplace to find amazing digital products.
                  </p>
                  <Button className="btn-primary">
                    Explore Marketplace
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profile Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profile?.avatar_url} />
                      <AvatarFallback>
                        {profile?.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-lg font-semibold">{profile?.full_name}</p>
                      <p className="text-muted-foreground">{profile?.email}</p>
                      {profile?.seller_verified && (
                        <Badge className="mt-2">Verified Seller</Badge>
                      )}
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}