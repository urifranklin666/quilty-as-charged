# quiltyascharged.art deployment

The static files in `../web` are served by nginx and exposed through the
`quiltyascharged` Cloudflare Tunnel.

Production locations:

- Website: `/var/www/quiltyascharged.art`
- nginx site: `/etc/nginx/sites-available/quiltyascharged.art`
- Tunnel config: `/etc/cloudflared/quiltyascharged.yml`
- systemd unit: `cloudflared@quiltyascharged.service`

After changing the files in `web`, publish them with:

```bash
sudo rsync -a --delete ../web/ /var/www/quiltyascharged.art/
```
