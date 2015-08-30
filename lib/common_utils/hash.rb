
class Hash
  def loop_keys_recursive
    puts "loop_keys_recursive"
  end

  def deep_merge(other, &block)
    merge(other) do |k, v1, v2|
      (v1.is_a?(Hash) && v2.is_a?(Hash)) ?
        v1.deep_merge(v2, &block) :
        (block_given? ? yield(k, v1, v2) : v2)
    end
  end

  def +(other)
    merge(other)
  end

  def inc(key, by_x = 1)
    if self.key?(key)
      self[key] += by_x
    else
      self[key] = by_x
    end
  end

  def map_keys(&block)
    self.clone.map_keys!(&block)
  end

  def map_keys!(&block)
    self.keys.each { |k| self[yield(k)] = delete(k) }
    self
  end

  def map_values(&block)
    self.clone.map_values!(&block)
  end

  def map_values!(&block)
    self.each { |k,v| self[k] = yield(v) }
    self
  end

  def find_value(key_match = nil)
    self.find { |k,v| break v if (block_given? ? yield(k) : k === key_match) }
  end

  def collide!(*others)
    removed = []
    others.each do |other|
      other.each do |key, value|
        if include?(key) and self[key] != value
          delete(key)
          removed << key
        elsif removed.exclude?(key)
          self[key] = value
        end
      end
    end
    self
  end
  def collide(*others)
    self.clone.collide!(*others)
  end

  # transform a hash of arrays into an array of hashes
  # ex. { 'a' => [1, 2], 'b' => [3, 4] }.by_rows
  #  => [ { 'a' => 1, 'b' => 3 }, { 'a' => 2, 'b' => 4 } ]
  def by_rows
    row_count = values.map(&:length).max
    row_count.times.map do |row_i|
      map { |k,v| [k, v[row_i]] }.hashify
    end
  end

  def sum_merge!(*others)
    merge!(*others) { |k, *v| v.sum }
  end
  def sum_merge(*others)
    merge(*others) { |k, *v| v.sum }
  end
end