import React, { useState } from 'react';
import { Mail, Plus, Copy, Shield, Eye, EyeOff, Trash2, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface EmailAlias {
  id: string;
  alias: string;
  realEmail: string;
  description: string;
  enabled: boolean;
  createdAt: Date;
  forwardCount: number;
  lastUsed: Date | null;
}

const EmailAliasManager = () => {
  const { toast } = useToast();
  const [showRealEmails, setShowRealEmails] = useState<{ [key: string]: boolean }>({});
  
  // Sample data - in real app this would come from Supabase
  const [aliases] = useState<EmailAlias[]>([
    {
      id: '1',
      alias: 'shopping.mario@hidemail.app',
      realEmail: 'mario.rossi@gmail.com',
      description: 'Per acquisti online',
      enabled: true,
      createdAt: new Date('2024-01-10'),
      forwardCount: 23,
      lastUsed: new Date('2024-01-14')
    },
    {
      id: '2',
      alias: 'newsletter.mario@hidemail.app',
      realEmail: 'mario.rossi@gmail.com',
      description: 'Newsletter e abbonamenti',
      enabled: true,
      createdAt: new Date('2024-01-08'),
      forwardCount: 156,
      lastUsed: new Date('2024-01-15')
    },
    {
      id: '3',
      alias: 'social.mario@hidemail.app',
      realEmail: 'mario.rossi@gmail.com',
      description: 'Social media e forum',
      enabled: false,
      createdAt: new Date('2024-01-05'),
      forwardCount: 8,
      lastUsed: new Date('2024-01-12')
    }
  ]);

  const toggleEmailVisibility = (id: string) => {
    setShowRealEmails(prev => ({
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

  const generateNewAlias = () => {
    const randomString = Math.random().toString(36).substring(2, 8);
    const newAlias = `auto${randomString}@hidemail.app`;
    copyToClipboard(newAlias, 'Nuovo alias');
    toast({
      title: "Nuovo alias generato!",
      description: "L'alias è stato copiato negli appunti. Configuralo nel tuo provider email.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestione Alias Email</h2>
          <p className="text-muted-foreground">Proteggi la tua vera email con alias temporanei</p>
        </div>
        <Button variant="vault" onClick={generateNewAlias}>
          <Plus className="h-4 w-4 mr-2" />
          Genera Alias
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-vault-primary/20">
                <Mail className="h-4 w-4 text-vault-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Alias Totali</p>
                <p className="text-xl font-bold text-foreground">{aliases.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/20">
                <Shield className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Attivi</p>
                <p className="text-xl font-bold text-success">{aliases.filter(a => a.enabled).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/20">
                <Mail className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email Inoltrate</p>
                <p className="text-xl font-bold text-foreground">
                  {aliases.reduce((sum, alias) => sum + alias.forwardCount, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/20">
                <Mail className="h-4 w-4 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Disattivi</p>
                <p className="text-xl font-bold text-destructive">{aliases.filter(a => !a.enabled).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alias List */}
      <div className="space-y-4">
        {aliases.map((alias) => (
          <Card key={alias.id} className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-foreground">{alias.description}</h3>
                    <Badge className={alias.enabled 
                      ? 'bg-success/20 text-success border-success/30' 
                      : 'bg-destructive/20 text-destructive border-destructive/30'
                    }>
                      {alias.enabled ? 'Attivo' : 'Disattivo'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div>
                        <label className="text-xs text-muted-foreground uppercase tracking-wide">Alias Email</label>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-mono text-vault-primary">{alias.alias}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(alias.alias, 'Alias')}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-xs text-muted-foreground uppercase tracking-wide">Email Reale</label>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-mono text-foreground">
                            {showRealEmails[alias.id] ? alias.realEmail : '••••••••@••••••••.com'}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => toggleEmailVisibility(alias.id)}
                          >
                            {showRealEmails[alias.id] ? (
                              <EyeOff className="h-3 w-3" />
                            ) : (
                              <Eye className="h-3 w-3" />
                            )}
                          </Button>
                          {showRealEmails[alias.id] && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => copyToClipboard(alias.realEmail, 'Email reale')}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <label className="text-xs text-muted-foreground uppercase tracking-wide">Email Inoltrate</label>
                        <div className="text-sm text-foreground mt-1 font-semibold">
                          {alias.forwardCount} messaggi
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-xs text-muted-foreground uppercase tracking-wide">Ultimo Utilizzo</label>
                        <div className="text-sm text-muted-foreground mt-1">
                          {alias.lastUsed ? alias.lastUsed.toLocaleDateString('it-IT') : 'Mai utilizzato'}
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

      {/* Setup Instructions */}
      <Card className="bg-vault-primary/10 border-vault-primary/20">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Come configurare gli alias email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>1.</strong> Crea un nuovo alias cliccando su "Genera Alias"
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>2.</strong> Configura l'inoltro nel tuo provider email (Gmail, Outlook, etc.)
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>3.</strong> Usa l'alias quando ti registri su siti web o servizi
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>4.</strong> Monitora l'attività e disabilita gli alias se necessario
            </p>
          </div>
          
          <div className="mt-4 p-3 rounded-lg bg-warning/10 border border-warning/20">
            <p className="text-xs text-muted-foreground">
              <strong>Nota:</strong> Questa è una demo. In produzione, avrai bisogno di integrare un servizio di alias email come SimpleLogin o AnonAddy tramite Supabase Edge Functions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailAliasManager;