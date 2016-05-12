require 'test_helper'

class UserInfoControllerTest < ActionController::TestCase
  test "should get show_public_info" do
    get :show_public_info
    assert_response :success
  end

end
