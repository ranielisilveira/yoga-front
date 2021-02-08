import pt from 'vuetify/es5/locale/pt'

export default {
  ...pt,
  data_not_filled: 'Favor preencher os dados',
  email_not_filled: 'Favor preencher o email',
  logout_success: 'Você foi deslogado com sucesso.',
  page_not_found: 'Página não encotrada.',
  error: 'Ocorreu um erro.',
  home_page: 'Página Inicial',
  welcome: 'Bem-vindo(a)',
  admin_area: 'Área Administrativa',
  profile: 'Perfil',
  logout: 'Sair',
  add: 'Adicionar',
  store: 'Salvar',
  update: 'Atualizar',
  delete: 'Deletar',
  restore: 'Restaurar',
  cancel: 'Cancelar',
  search_label: 'Buscar',
  details: 'Detalhes',
  deactivate: 'Desativar',
  confirm: 'Confirmar',
  active: 'Ativo',
  inactive: 'Inativo',
  taken: 'Usado',
  available: 'Disponível',
  close: 'Fechar',
  pwa_ios:
  'Para instalar como um App clique no icone na barra de navegação abaixo e em seguida "Adicionar à página inicial"',
  admin_menu: {
    config: 'Configurações',
    config_desc: 'configurações do aplicativo',
    categories: 'Categorias',
    redeem_codes: 'Códigos de Resgate',
    content: 'Conteúdos',
    content_desc: 'vídeos, livros e textos',
    media: 'Mídia',
    about: 'Página Sobre',
    users: 'Usuários',
  },
  auth: {
    enter: 'Entrar',
    enter_desc: 'Entre com seu email e senha.',
    forgot_password: 'esqueceu sua senha?',
    your_name: 'Seu Nome.',
    your_email: 'Seu Email.',
    your_password: 'Sua Senha.',
    email_confirmed: 'Sua conta foi verificada com sucesso.',
    password_recovery: 'Recuperação de Senha',
    type_your_email: 'Digite seu email de login.',
    sent: 'Enviar',
    create_new_password: 'Criar Nova Senha',
    pick_new_password: 'Escolha uma nova senha para sua conta.',
    new_password: 'Nova Senha',
    confirm_new_password: 'Confirmar Senha',
    create_password: 'Criar Senha',
    mail_token_error: 'O código de segurança deve ser informado',
    logout_success: 'Você foi deslogado com sucesso.',
    create_account: 'Criar conta',
    register_desc: 'Digite seu email e escolha uma senha.',
    redeem_code: 'Código de Resgate',
    profile_update: 'Atualizar perfil',
    profile_desc: 'Atualizar nome ou idioma',
    profile_desc_2: 'Atualizar senha',
    current_password: 'Senha atual',
    update_data: 'Atualizar Dados',
    update_password: 'Atualizar Senha',
  },
  breadcumbs: {
    config: 'configurações',
    categories: 'Categorias',
    redeem_codes: 'Códigos de Resgate',
    content: 'Conteúdos',
    media: 'Mídia',
    users: 'Usuários',
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
