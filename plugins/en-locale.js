import en from 'vuetify/es5/locale/en'

export default {
  ...en,
  data_not_filled: 'Please fill in the details',
  email_not_filled: 'Please fill in the email',
  logout_success: 'You have been successfully logged out.',
  page_not_found: 'Page Not Found.',
  error: 'An error occurred',
  home_page: 'Home page',
  welcome: 'Welcome',
  admin_area: 'Admin Area',
  profile: 'Profile',
  logout: 'Logout',
  add: 'Adicionar',
  store: 'Save',
  update: 'Update',
  delete: 'Delete',
  restore: 'Restore',
  cancel: 'Cancel',
  search_label: 'Search',
  details: 'Details',
  deactivate: 'Deactivate',
  confirm: 'Confirm',
  active: 'Active',
  inactive: 'Inactive',
  taken: 'Taken',
  available: 'Available',
  close: 'Close',
  pwa_ios:
    'To install as an App click on the icon in the navigation bar below and then "Add to homepage"',
  admin_menu: {
    config: 'Settings',
    config_desc: 'Application settings',
    categories: 'Categories',
    redeem_codes: 'Redemption Codes',
    content: 'Contents',
    content_desc: 'videos, books and texts',
    media: 'Media',
    about: 'About page',
  },
  auth: {
    enter: 'Login',
    enter_desc: 'Enter your email and password.',
    forgot_password: 'forgot password?',
    your_name: 'Your Name.',
    your_email: 'Your Email.',
    your_password: 'Your password.',
    email_confirmed: 'Your Email has been successfully confirmed.',
    password_recovery: 'Password Recovery',
    type_your_email: 'Enter your login email.',
    sent: 'Submit',
    create_new_password: 'Create New Password',
    pick_new_password: 'Choose a new password for your account.',
    new_password: 'New password',
    confirm_new_password: 'Confirm password',
    create_password: 'Create password',
    mail_token_error: 'The security code must be administered',
    logout_success: 'You have been successfully logged out.',
    create_account: 'Create Account',
    register_desc: 'Enter your email and choose an password.',
    redeem_code: 'Redemption Code',
    profile_update: 'Update Profile',
    profile_desc: 'Update Name or Language',
    profile_desc_2: 'Update Password',
    current_password: 'Current Password',
    update_data: 'Update Data',
    update_password: 'Update Password',
  },
  breadcumbs: {
    config: 'settings',
    categories: 'Categories',
    redeem_codes: 'Redeem Codes',
    content: 'Contents',
    media: 'Medias',
  },
  categories: {
    head: 'Categories',
    delete_dialog_title: 'Do you want to remove the selected Category?',
    delete_dialog_info: 'The related features will also be disabled.',
    restore_dialog_title: 'Do you want to Restore the selected Category?',
    restore_dialog_info: 'Related resources will also be restored.',
    new: 'New Category',
    name: 'Category Name',
    color: 'Category Color (used by menus)',
    image: 'Image',
    current_image: 'Current Image',
    image_label: 'Select a image: png, jpeg ou gif',
    headers: {
      order: 'Order',
      name: 'Name',
      parent_category_name: 'Parent Category',
      media: 'Media',
      color: 'Color',
      sub_categories_count: 'Children Categories',
      status: 'Status',
      actions: 'Actions',
    },
  },
  redeem_codes: {
    head: 'Redemption Code',
    delete_dialog_title: 'Do you want to delete the selected code?',
    delete_dialog_info: 'This action is irreversible.',
    code: 'Unique Code',
    new: 'New Code',
    import: 'or Import a list',
    import_desc: 'import list .csv',
    headers: {
      code: 'Code',
      user: 'User',
      status: 'Situation',
      actions: 'Actions',
    },
  },
  medias: {
    head: 'Contents',
    delete_dialog_title: 'Do you want to remove the Selected Media?',
    delete_dialog_info: 'The related features will be disabled.',
    restore_dialog_title: 'Do you want to remove the Selected Media?',
    restore_dialog_info: 'The related resources will be restored.',
    new: 'New Media',
    edit: 'Edit Media',
    media_video: 'Video Link',
    media_pdf: 'File',
    media_text: 'Text',
    hints: {
      video: 'Paste only ID of video (numeric identifier)',
      pdf: 'File',
      text: 'Text',
    },
    headers: {
      category: 'Category',
      media: 'Media',
      type: 'Tipo',
      status: 'Situation',
      actions: 'Actions',
    },
  },
  users: {
    headers: {
      name: 'Name',
      email: 'Email',
      is_active: 'Account Status',
      code: 'Code',
    },
  },
}
