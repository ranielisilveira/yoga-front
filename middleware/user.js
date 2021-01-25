export default function ({ redirect, $auth }) {
  if ($auth.user.is_admin) {
    return redirect(`/admin`)
  }
}
