import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function UmbrellaOff({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M11.293 11.293C11.4739 11.112 11.7239 11 12 11C12.5523 11 13 11.4477 13 12V19C13 20.1046 13.8954 21 15 21C16.1046 21 17 20.1046 17 19C17 18.7018 16.9332 18.4068 16.8047 18.1377C16.5669 17.6394 16.7781 17.0426 17.2764 16.8047C17.7747 16.5668 18.3714 16.7781 18.6094 17.2764C18.8664 17.8146 19 18.4035 19 19C19 21.2092 17.2092 23 15 23C12.7908 23 11 21.2092 11 19V12.3125C10.117 11.1617 8.6578 11.234 7.84766 12.5303C7.45591 13.1565 6.54409 13.1565 6.15234 12.5303C5.29404 11.157 3.70596 11.157 2.84766 12.5303C2.31501 13.3818 1 13.0046 1 12C1 8.9625 2.23108 6.21238 4.22168 4.22168L11.293 11.293Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 1C18.0751 1 23 5.9249 23 12C23 13.0046 21.685 13.3818 21.1523 12.5303C20.357 11.2578 18.9351 11.1643 18.0479 12.25C17.869 12.4685 17.6063 12.601 17.3242 12.6152C17.042 12.6294 16.7663 12.524 16.5664 12.3242L7.63867 3.39551C7.40035 3.15701 7.2983 2.81442 7.36719 2.48438C7.43609 2.15436 7.6667 1.88106 7.98047 1.75781C9.22554 1.26853 10.5814 1 12 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 2L22 22"/>
    </svg>
  )
}
