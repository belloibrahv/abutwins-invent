<?php
declare(strict_types=1);

namespace Atoms\Database;

final class Migrator
{
    public function maybeMigrate(): void
    {
        $installed = get_option('atoms_db_version', '');
        if ($installed === Schema::version()) {
            return;
        }

        $this->migrate();
    }

    public function migrate(): void
    {
        require_once ABSPATH . 'wp-admin/includes/upgrade.php';

        foreach (Schema::tables() as $sql) {
            dbDelta($sql);
        }

        $this->applyAlterMigrations();

        update_option('atoms_db_version', Schema::version());
        update_option('atoms_flush_rewrite', '1');
    }

    private function applyAlterMigrations(): void
    {
        global $wpdb;
        $saleItems = $wpdb->prefix . 'atoms_sale_items';
        $imeiCol = $wpdb->get_row("SHOW COLUMNS FROM {$saleItems} LIKE 'imei_id'", ARRAY_A);
        if (is_array($imeiCol) && strtoupper((string) ($imeiCol['Null'] ?? '')) === 'NO') {
            $wpdb->query("ALTER TABLE {$saleItems} MODIFY imei_id bigint(20) unsigned NULL");
        }
    }
}
