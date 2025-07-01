import { motion } from 'framer-motion'

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  animate = false,
  className = '' 
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 border border-primary-200',
    secondary: 'bg-gradient-to-r from-secondary-50 to-purple-50 text-secondary-700 border border-secondary-200',
    accent: 'bg-gradient-to-r from-accent-50 to-orange-50 text-accent-700 border border-accent-200',
    success: 'bg-gradient-to-r from-green-50 to-emerald-50 text-success border border-green-200',
    warning: 'bg-gradient-to-r from-yellow-50 to-amber-50 text-warning border border-yellow-200',
    error: 'bg-gradient-to-r from-red-50 to-rose-50 text-error border border-red-200',
    growth: 'bg-gradient-to-r from-success to-emerald-500 text-white shadow-sm',
    decline: 'bg-gradient-to-r from-error to-red-500 text-white shadow-sm'
  }
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  }
  
  const BadgeComponent = animate ? motion.span : 'span'
  const animationProps = animate ? {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: { type: "spring", bounce: 0.5 }
  } : {}
  
  return (
    <BadgeComponent
      {...animationProps}
      className={`
        inline-flex items-center font-medium rounded-full
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {children}
    </BadgeComponent>
  )
}

export default Badge