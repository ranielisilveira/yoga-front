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
    head: 'Categorias',
    delete_dialog_title: 'Deseja remover a Categoria Selecionada?',
    delete_dialog_info: 'Os recursos relacionados serão removidos.',
    restore_dialog_title: 'Deseja remover a Categoria Selecionada?',
    restore_dialog_info: 'Os recursos relacionados serão restaurados.',
    new: 'Nova Categoria',
    name: 'Nome da Categoria',
    color: 'Cor Categoria (usada nos menus)',
    image: 'Imagem',
    current_image: 'Imagem atual',
    image_label: 'Selecione uma imagem: png, jpeg ou gif',
    headers: {
      order: 'Ordem',
      name: 'Nome',
      parent_category_name: 'Categoria Pai',
      media: 'Mídias',
      color: 'Cor',
      sub_categories_count: 'Categories',
      status: 'Situação',
      actions: 'Ações',
    },
  },
  redeem_codes: {
    head: 'Código de Resgate',
    delete_dialog_title: 'Deseja excluir o código selecionado?',
    delete_dialog_info: 'Esta ação é irreversível.',
    code: 'Código Único',
    new: 'Novo Código',
    import: 'ou Importar uma lista',
    import_desc: 'Importar lista .csv',
    headers: {
      code: 'Código',
      user: 'Usuário',
      status: 'Situação',
      actions: 'Ações',
    },
  },
  medias: {
    head: 'Conteúdos',
    delete_dialog_title: 'Deseja remover a Mídia Selecionada?',
    delete_dialog_info: 'Os recursos relacionados serão desativados.',
    restore_dialog_title: 'Deseja remover a Mídia Selecionada?',
    restore_dialog_info: 'Os recursos relacionados serão restaurados.',
    new: 'Nova Mídia',
    edit: 'Editar Mídia',
    media_video: 'Link do Vídeo',
    media_pdf: 'Arquivo',
    media_text: 'Texto',
    hints: {
      video: 'Colar somente o ID do vídeo (identificador númerico)',
      pdf: 'Enviar arquivos pdf',
      text: 'Colar o texto desejado para as linguagens',
    },
    headers: {
      category: 'Categoria',
      media: 'Mídia',
      type: 'Type',
      status: 'Situação',
      actions: 'Ações',
    },
  },
  users: {
    headers: {
      name: 'Nome',
      email: 'Email',
      is_active: 'Status da Conta',
      code: 'Código',
    },
  },
}
