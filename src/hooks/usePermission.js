import { useRoleStore } from '../store/roleStore'

const PERMISSIONS = {
  admin: { add: true, edit: true, delete: true, export: true },
  viewer: { add: false, edit: false, delete: false, export: false },
}

export function usePermission(action) {
  const role = useRoleStore((s) => s.role)
  return PERMISSIONS[role]?.[action] ?? false
}
