# live.quiltyascharged.art deployment

The browser/PWA build in `../www` is served by nginx through the existing
`quiltyascharged` Cloudflare Tunnel.

Production locations:

- Website: `/var/www/live.quiltyascharged.art`
- nginx site: `/etc/nginx/sites-available/live.quiltyascharged.art`
- Tunnel service: `cloudflared@quiltyascharged.service`

Publish changes with:

```bash
sudo rsync -a --delete ../www/ /var/www/live.quiltyascharged.art/
```
