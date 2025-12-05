import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, LogOut, FileText, Shield } from "lucide-react";

const Account = () => {
  const { user, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-accent/10 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Account</h1>
            <p className="text-muted-foreground">Welcome back, {user.email}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Your account details</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-accent/10">
                    <FileText className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle>{isAdmin ? "All Bookings" : "My Bookings"}</CardTitle>
                    <CardDescription>
                      {isAdmin ? "View and manage all reservations" : "View your trip reservations"}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link to={isAdmin ? "/admin/bookings" : "/my-bookings"}>
                  <Button className="w-full">
                    {isAdmin ? "View All Bookings" : "View My Bookings"}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {isAdmin && (
              <Card className="hover:shadow-lg transition-shadow border-secondary">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-secondary/10">
                      <Shield className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <CardTitle>Admin Dashboard</CardTitle>
                      <CardDescription>Manage all bookings</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link to="/admin">
                    <Button variant="outline" className="w-full">
                      Access Admin Panel
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-destructive/10">
                    <LogOut className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <CardTitle>Sign Out</CardTitle>
                    <CardDescription>Log out of your account</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={signOut}
                >
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
