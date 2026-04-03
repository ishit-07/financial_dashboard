import { useRoleStore } from '../../store/roleStore'
import Badge from '../ui/Badge'

export default function RoleBadge() {
  const role = useRoleStore((s) => s.role)

  return (
    <Badge variant={role === 'admin' ? 'primary' : 'default'}>
      {role === 'admin' ? 'Admin' : 'Viewer'}
    </Badge>
  )
}
