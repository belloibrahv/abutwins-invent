<?php
declare(strict_types=1);

namespace Atoms\Admin;

final class Menu
{
    public function register(): void
    {
        add_action('admin_menu', [$this, 'menu']);
        add_action('admin_enqueue_scripts', [$this, 'assets']);
        add_action('admin_init', [$this, 'maybeRedirect']);
        add_action('in_admin_header', static function (): void {
            if (isset($_GET['page']) && $_GET['page'] === 'atoms') {
                remove_all_actions('admin_notices');
                remove_all_actions('all_admin_notices');
            }
        });
        add_filter('admin_body_class', [$this, 'bodyClass']);
    }

    public function bodyClass(string $classes): string
    {
        if (isset($_GET['page']) && $_GET['page'] === 'atoms') {
            $classes .= ' atoms-app-body';
        }
        return $classes;
    }

    public function menu(): void
    {
        add_menu_page(
            'ATOMS',
            'ATOMS',
            'atoms_access',
            'atoms',
            [$this, 'render'],
            'dashicons-smartphone',
            2
        );
    }

    public function render(): void
    {
        include ATOMS_PATH . 'templates/admin-app.php';
    }

    public function assets(string $hook): void
    {
        if (!str_contains($hook, 'atoms')) {
            return;
        }

        $settings = (new \Atoms\Services\SettingsService())->get();

        wp_enqueue_style(
            'atoms-fonts',
            'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Roboto+Mono:wght@400;500;600&display=swap',
            [],
            null
        );
        wp_enqueue_style(
            'atoms-material-symbols',
            'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
            [],
            null
        );
        wp_enqueue_style('atoms', ATOMS_URL . 'assets/css/atoms.css', ['atoms-fonts', 'atoms-material-symbols'], ATOMS_VERSION);

        wp_enqueue_script(
            'atoms-chartjs',
            'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/dist/chart.umd.min.js',
            [],
            '4.4.2',
            true
        );

        if (!empty($settings['google_maps_key'])) {
            wp_enqueue_script(
                'atoms-google-maps',
                'https://maps.googleapis.com/maps/api/js?key=' . esc_attr($settings['google_maps_key']) . '&libraries=places',
                [],
                null,
                true
            );
        }

        wp_enqueue_script(
            'html5-qrcode',
            'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js',
            [],
            '2.3.8',
            true
        );

        wp_enqueue_script(
            'atoms-scanner',
            ATOMS_URL . 'assets/js/atoms-scanner.js',
            ['html5-qrcode'],
            ATOMS_VERSION,
            true
        );

        wp_enqueue_script('atoms', ATOMS_URL . 'assets/js/atoms.js', ['atoms-chartjs', 'atoms-scanner'], ATOMS_VERSION, true);
        wp_localize_script('atoms', 'ATOMS', [
            'root'  => esc_url_raw(rest_url('atoms/v1/')),
            'nonce' => wp_create_nonce('wp_rest'),
            'home'  => admin_url('admin.php?page=atoms'),
            'pwa'   => false,
            'sw'    => home_url('/atoms-app/sw.js'),
            'app'   => home_url('/atoms-app/'),
            'google_maps_key' => $settings['google_maps_key'] ?? '',
        ]);
    }

    public function maybeRedirect(): void
    {
        if (!is_admin() || !current_user_can('atoms_access') || current_user_can('manage_options')) {
            return;
        }
        global $pagenow;
        if ($pagenow === 'index.php') {
            wp_safe_redirect(admin_url('admin.php?page=atoms'));
            exit;
        }
    }
}
