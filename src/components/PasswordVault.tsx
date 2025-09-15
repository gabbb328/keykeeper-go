import React, { useState } from 'react';
import { Shield, Plus, Search, Eye, EyeOff, Copy, Mail, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface PasswordEntry {
  id: string;
  title: string;
  username: string;
  password: string;
  website: string;
  category: 'Login' | 'Email' | 'Sociale' | 'Lavoro' | 'Altro';
  favorite: boolean;
  lastUsed: Date;
}

const PasswordVault = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});
  
  // Sample data - in real app this would come from Supabase
  const [passwords] = useState<PasswordEntry[]>([
    {
      id: '1',
      title: 'Gmail',
      username: 'mario.rossi@gmail.com',
      password: 'SuperSecure123!@#',
      website: 'gmail.com',
      category: 'Email',
      favorite: true,
      lastUsed: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Facebook',
      username: 'mario.rossi',
      password: 'MyPassword456$%^',
      website: 'facebook.com',
      category: 'Sociale',
      favorite: false,
      lastUsed: new Date('2024-01-10')
    },
    {
      id: '3',
      title: 'Lavoro - Outlook',
      username: 'mario.rossi@azienda.it',
      password: 'WorkPass789&*()',
      website: 'outlook.com',
      category: 'Lavoro',
      favorite: true,
      lastUsed: new Date('2024-01-14')
    }
  ]);

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiato!",
      description: `${type} copiato negli appunti.`,
    });
  };

  const filteredPasswords = passwords.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.website.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    const colors = {
      'Login': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Email': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Sociale': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Lavoro': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Altro': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    return colors[category as keyof typeof colors] || colors['Altro'];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-vault-primary/20">
                <Shield className="h-6 w-6 text-vault-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Password Manager</h1>
                <p className="text-sm text-muted-foreground">I tuoi account sono al sicuro</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="vault" size="sm">
                <Plus className="h-4 w-4" />
                Aggiungi Password
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4" />
                Alias Email
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Cerca</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cerca password..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Statistiche Vault</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Password totali</span>
                  <span className="font-semibold text-vault-primary">{passwords.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Password sicure</span>
                  <span className="font-semibold text-success">{passwords.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Password deboli</span>
                  <span className="font-semibold text-destructive">0</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredPasswords.map((password) => (
                <Card key={password.id} className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-foreground">{password.title}</h3>
                          <Badge className={getCategoryColor(password.category)}>
                            {password.category}
                          </Badge>
                          {password.favorite && (
                            <Badge variant="outline" className="text-warning border-warning/30">
                              ⭐ Preferito
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div>
                              <label className="text-xs text-muted-foreground uppercase tracking-wide">Username</label>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm font-mono text-foreground">{password.username}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => copyToClipboard(password.username, 'Username')}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            
                            <div>
                              <label className="text-xs text-muted-foreground uppercase tracking-wide">Sito Web</label>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm text-vault-primary">{password.website}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div>
                              <label className="text-xs text-muted-foreground uppercase tracking-wide">Password</label>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm font-mono text-foreground">
                                  {showPasswords[password.id] ? password.password : '••••••••••••'}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => togglePasswordVisibility(password.id)}
                                >
                                  {showPasswords[password.id] ? (
                                    <EyeOff className="h-3 w-3" />
                                  ) : (
                                    <Eye className="h-3 w-3" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => copyToClipboard(password.password, 'Password')}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            
                            <div>
                              <label className="text-xs text-muted-foreground uppercase tracking-wide">Ultimo utilizzo</label>
                              <div className="text-sm text-muted-foreground mt-1">
                                {password.lastUsed.toLocaleDateString('it-IT')}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordVault;