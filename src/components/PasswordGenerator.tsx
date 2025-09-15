import React, { useState, useEffect } from 'react';
import { RefreshCw, Copy, Settings, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

const PasswordGenerator = () => {
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [length, setLength] = useState([16]);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: false,
  });

  const generatePassword = () => {
    let charset = '';
    
    if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.numbers) charset += '0123456789';
    if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (options.excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, '');
    }
    
    let newPassword = '';
    for (let i = 0; i < length[0]; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    setPassword(newPassword);
  };

  useEffect(() => {
    generatePassword();
  }, [length, options]);

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    toast({
      title: "Password copiata!",
      description: "La password è stata copiata negli appunti.",
    });
  };

  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (options.uppercase && options.lowercase) score++;
    if (options.numbers) score++;
    if (options.symbols) score++;
    
    if (score <= 2) return { level: 'Debole', color: 'text-destructive', bgColor: 'bg-destructive' };
    if (score <= 3) return { level: 'Media', color: 'text-warning', bgColor: 'bg-warning' };
    if (score <= 4) return { level: 'Forte', color: 'text-success', bgColor: 'bg-success' };
    return { level: 'Molto Forte', color: 'text-success', bgColor: 'bg-success' };
  };

  const strength = getPasswordStrength();

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-vault-primary" />
          Generatore di Password
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Generated Password */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Password Generata</label>
          <div className="flex gap-2">
            <Input
              value={password}
              readOnly
              className="font-mono text-sm"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={copyPassword}
              className="shrink-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={generatePassword}
              className="shrink-0"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Password Strength */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Sicurezza:</span>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`h-2 w-3 rounded-sm ${
                      i <= (password.length >= 16 && options.uppercase && options.lowercase && options.numbers && options.symbols ? 5 :
                            password.length >= 12 && options.uppercase && options.lowercase && options.numbers ? 4 :
                            password.length >= 8 && options.uppercase && options.lowercase ? 3 :
                            password.length >= 6 ? 2 : 1)
                        ? strength.bgColor
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              <span className={`text-sm font-medium ${strength.color}`}>
                {strength.level}
              </span>
            </div>
          </div>
        </div>

        {/* Length Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-foreground">Lunghezza</label>
            <span className="text-sm text-vault-primary font-mono">{length[0]} caratteri</span>
          </div>
          <Slider
            value={length}
            onValueChange={setLength}
            max={50}
            min={4}
            step={1}
            className="w-full"
          />
        </div>

        {/* Options */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-foreground">Opzioni</label>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="uppercase"
                checked={options.uppercase}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, uppercase: checked as boolean })
                }
              />
              <label htmlFor="uppercase" className="text-sm">
                Lettere maiuscole (A-Z)
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="lowercase"
                checked={options.lowercase}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, lowercase: checked as boolean })
                }
              />
              <label htmlFor="lowercase" className="text-sm">
                Lettere minuscole (a-z)
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="numbers"
                checked={options.numbers}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, numbers: checked as boolean })
                }
              />
              <label htmlFor="numbers" className="text-sm">
                Numeri (0-9)
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="symbols"
                checked={options.symbols}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, symbols: checked as boolean })
                }
              />
              <label htmlFor="symbols" className="text-sm">
                Simboli (!@#$%^&*)
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="excludeSimilar"
                checked={options.excludeSimilar}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, excludeSimilar: checked as boolean })
                }
              />
              <label htmlFor="excludeSimilar" className="text-sm">
                Escludi caratteri simili (i, l, 1, L, o, 0, O)
              </label>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <Button onClick={generatePassword} variant="vault" className="w-full">
          <RefreshCw className="h-4 w-4 mr-2" />
          Genera Nuova Password
        </Button>
      </CardContent>
    </Card>
  );
};

export default PasswordGenerator;