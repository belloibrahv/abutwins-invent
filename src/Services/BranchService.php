<?php
declare(strict_types=1);

namespace Atoms\Services;

use Atoms\Domain\DomainException;
use Atoms\Support\Db;

final class BranchService
{
    public function __construct(private readonly Db $db = new Db())
    {
    }

    /**
     * @return list<array<string, mixed>>
     */
    public function all(bool $activeOnly = true): array
    {
        global $wpdb;
        $table = $this->db->table('branches');
        $sql   = $activeOnly ? "SELECT * FROM {$table} WHERE is_active = 1 ORDER BY name" : "SELECT * FROM {$table} ORDER BY name";

        return $wpdb->get_results($sql, ARRAY_A) ?: [];
    }

    public function get(int $id): array
    {
        $row = $this->db->find('branches', $id);
        if (!$row) {
            throw new DomainException('Branch not found.');
        }

        return $row;
    }

    public function findByCode(string $code): ?array
    {
        global $wpdb;
        $code = strtoupper(sanitize_key($code));
        if ($code === '') {
            return null;
        }
        $row = $wpdb->get_row(
            $wpdb->prepare('SELECT * FROM ' . $this->db->table('branches') . ' WHERE code = %s', $code),
            ARRAY_A
        );

        return $row ?: null;
    }

    /**
     * @param array<string, mixed> $data
     */
    public function save(?int $id, array $data): array
    {
        $payload = [
            'name'       => sanitize_text_field((string) $data['name']),
            'code'       => strtoupper(sanitize_key((string) $data['code'])),
            'address'    => sanitize_textarea_field((string) ($data['address'] ?? '')),
            'phone'      => sanitize_text_field((string) ($data['phone'] ?? '')),
            'is_active'  => empty($data['is_active']) ? 0 : 1,
            'updated_at' => $this->db->now(),
        ];

        if ($id) {
            $this->db->update('branches', $payload, ['id' => $id]);
            return $this->get($id);
        }

        $payload['created_at'] = $this->db->now();
        $newId = $this->db->insert('branches', $payload);

        return $this->get($newId);
    }
}
