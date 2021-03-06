# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# adi baron
Rails.application.config.assets.paths << Rails.root.join('lib', 'assets')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
Rails.application.config.assets.precompile += %w( sites.js )
Rails.application.config.assets.precompile += %w( sites_edit.js )
Rails.application.config.assets.precompile += %w( sites.css )
Rails.application.config.assets.precompile += %w( accounts.css )