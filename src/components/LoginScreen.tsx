import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [masterPassword, setMasterPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-vault-primary/20 mb-4">
            <Shield className="h-8 w-8 text-vault-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Password Manager</h1>
          <p className="text-muted-foreground">Inserisci la tua password master per accedere</p>
        </div>

        {/* Login Card */}
        <Card className="bg-card border-border shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-foreground">Accedi al tuo Vault</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="masterPassword" className="text-sm font-medium text-foreground">
                  Password Master
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="masterPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={masterPassword}
                    onChange={(e) => setMasterPassword(e.target.value)}
                    placeholder="Inserisci la password master"
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                variant="vault" 
                className="w-full" 
                disabled={!masterPassword || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent"></div>
                    Accesso in corso...
                  </div>
                ) : (
                  'Sblocca Vault'
                )}
              </Button>
            </form>

            {/* Security Info */}
            <div className="mt-6 p-4 rounded-lg bg-vault-primary/10 border border-vault-primary/20">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-vault-primary mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Sicurezza garantita</h4>
                  <p className="text-xs text-muted-foreground">
                    Le tue password sono crittografate end-to-end. Nemmeno noi possiamo accedervi senza la tua password master.
                  </p>
                </div>
              </div>
            </div>

            {/* Demo Note */}
            <div className="mt-4 p-3 rounded-lg bg-warning/10 border border-warning/20">
              <p className="text-xs text-center text-muted-foreground">
                <strong>Modalità Demo:</strong> Inserisci qualsiasi password per accedere
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            Protetto da crittografia AES-256
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;