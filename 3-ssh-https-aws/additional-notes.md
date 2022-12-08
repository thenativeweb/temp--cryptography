# Port-Forwarding über SSH

## Use-Case

Ein bestimmter Service ist nur über das Netzwerk des Servers, aber nicht über den eigenen Rechner erreichbar.
Beispiele:
    - Die Management-UI eines Services auf dem Server, die nur lokal am Server erreichbar ist
    - Ein Service der nur im Firmennetzwerk erreichbar ist und der SSH Server ist im besagten Firmennetzwerk
    - Der Service ist bei dir lokal geblockt, weil du z.B. in falschen Land bist.


Beispiel:
```
ssh -L 8080:10.11.12.13:3000 user@ssh-host.tld
```

Wenn Du nun auf deinem lokalen Rechner localhost:8080 anfragst bekommst du als Antwort, was der SSH Server bekommen würde, wenn er eine Anfrage an 10.11.12.13 (in seinem lokalen Netzwerk) auf Port 3000 macht.

# X-Forwading über SSH

Damit können GUI-Applications headless auf dem SSH-Server gestartet werden und lokal auf deinem Rechner gerendert werden, ohne sie lokal installiert zu haben

```
ssh -X user@ssh-host.tld
```

Dafür muss der Client einen X-Server installiert haben. Das sollte auf den meisten Linuxgeräten der Fall sein. Auf dem Mac wird das ganze zunehmend schwieriger. Auf Windows gibt es Xming dafür.

# Certbot

Certbot ist ein Tool um automatisiert TLS Zertifikate zu beantragen, auf dem Server zu installieren, bestimmte Webserver sogar richtig für diese zu konfigurieren und die Zertifikate automatisch zu erneuern.

Eine Anleitung kann hier gefunden werden: https://certbot.eff.org/instructions
