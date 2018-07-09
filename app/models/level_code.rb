class LevelCode < ApplicationRecord
  scope :recent, -> { where("created_at > ?", 2.weeks.ago).order(:created_at) }

  def self.find_level_for code
    LevelCode.find_by(code: code.downcase.strip)
  end
end
