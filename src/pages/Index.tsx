import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginScreen from '@/components/LoginScreen';
import PasswordVault from '@/components/PasswordVault';
import PasswordGenerator from '@/components/PasswordGenerator';
import EmailAliasManager from '@/components/EmailAliasManager';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Tabs defaultValue="vault" className="w-full">
        <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-6">
            <TabsList className="h-16 bg-transparent border-0 gap-8">
              <TabsTrigger 
                value="vault" 
                className="data-[state=active]:bg-vault-primary/20 data-[state=active]:text-vault-primary text-base font-medium"
              >
                🔐 Password Vault
              </TabsTrigger>
              <TabsTrigger 
                value="generator" 
                className="data-[state=active]:bg-vault-primary/20 data-[state=active]:text-vault-primary text-base font-medium"
              >
                ⚡ Generatore
              </TabsTrigger>
              <TabsTrigger 
                value="aliases" 
                className="data-[state=active]:bg-vault-primary/20 data-[state=active]:text-vault-primary text-base font-medium"
              >
                📧 Alias Email
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="vault" className="mt-0">
          <PasswordVault />
        </TabsContent>

        <TabsContent value="generator" className="mt-0">
          <div className="container mx-auto px-6 py-8">
            <div className="max-w-2xl mx-auto">
              <PasswordGenerator />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="aliases" className="mt-0">
          <div className="container mx-auto px-6 py-8">
            <EmailAliasManager />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
