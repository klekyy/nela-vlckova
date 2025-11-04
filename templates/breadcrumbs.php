<?php
// Expects $breadcrumbs = [ [ 'label' => '...', 'url' => '...'|null ], ... ]
if (!isset($breadcrumbs) || !is_array($breadcrumbs) || count($breadcrumbs) === 0) {
    return;
}
?>
<nav class="breadcrumbs" aria-label="Drobečková navigace">
  <ol>
    <?php foreach ($breadcrumbs as $index => $item): ?>
      <?php
        $label = htmlspecialchars($item['label'] ?? '', ENT_QUOTES, 'UTF-8');
        $url = isset($item['url']) && $item['url'] !== '' ? $item['url'] : null;
        $isCurrent = $url === null || ($index + 1) === count($breadcrumbs);
      ?>
      <li>
        <?php if ($url && !$isCurrent): ?>
          <a href="<?= htmlspecialchars($url, ENT_QUOTES, 'UTF-8'); ?>"><?= $label; ?></a>
        <?php else: ?>
          <span aria-current="page"><?= $label; ?></span>
        <?php endif; ?>
      </li>
    <?php endforeach; ?>
  </ol>
</nav>
<script type="application/ld+json">
<?php
  // Build BreadcrumbList JSON-LD
  $items = [];
  foreach ($breadcrumbs as $i => $item) {
    $items[] = [
      '@type' => 'ListItem',
      'position' => $i + 1,
      'name' => (string)($item['label'] ?? ''),
      'item' => isset($item['url']) && $item['url'] !== '' ? $item['url'] : null,
    ];
  }
  $json = [
    '@context' => 'https://schema.org',
    '@type' => 'BreadcrumbList',
    'itemListElement' => $items,
  ];
  echo json_encode($json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
?>
</script>
