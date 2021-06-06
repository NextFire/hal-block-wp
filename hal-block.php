<?php

/**
 * Plugin Name:       HAL Block
 * Description:       HAL (open archive) block for Gutenberg.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            NextFire
 * License:           MIT License
 * License URI:       https://opensource.org/licenses/MIT
 * Text Domain:       hal-block
 * Plugin URI:        https://github.com/NextFire/hal-block-wp
 * Author URI:        https://github.com/NextFire
 *
 * @package           halb
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function halb_hal_block_block_init()
{
    register_block_type_from_metadata(__DIR__, array('render_callback' => 'halb_render'));
}
add_action('init', 'halb_hal_block_block_init');

function halb_render($attributes)
{
    ob_start()
?>
    <div class="wp-block-halb-hal-block" query=<?php echo $attributes['query']; ?>>
    </div>
<?php
    return ob_get_clean();
}
