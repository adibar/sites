class DomainConstraint
  def initialize
    # @domains = Domain.select("DISTINCT domain").map(&:domain).uniq
    # byebug
    @domains = ['31.154.159.63', '10.0.0.4', '10.0.0.23', 'ldev', 'adib', 'dev', 'test.dev', 'base', '', '', 'sidemenu']
  end

  def matches?(request)
    (@domains.include?(request.host)) || (@domains.include?(request.subdomain)) || (@domains.include?(request.domain))
  end
end


Rails.application.routes.draw do
  devise_for :users,
    :controllers => { :registrations => "users/registrations",
                      :sessions => "users/sessions",
    }
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'welcome#index'
  # root 'sites#show'

  # get 'edit' => 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # get ':action' => 'static#:action'


  resources :sites
  resources :images
  resources :rooms do
    collection do
      get   :search
      post  :search
    end
  end

  resources :sites do
    resources :images
    resources :rooms do
      collection do
        get   :search
        post  :search
      end
    end
  end

  constraints(DomainConstraint.new) do
      # get '*route', :constraints => { :route => /.*/ }, to: 'sites#show'
      # root 'sites#show'
      get '*route', to: 'sites#show'
  end

end

