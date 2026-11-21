import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Beehouse({ size = 24, ...props }: IconProps) {
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
      <path d="M2 8L11.2572 4.2971C11.734 4.1064 12.266 4.1064 12.7428 4.2971L22 8M12 4V2M4 8L5.7215 18.3288C5.8822 19.2932 6.7166 20 7.6943 20L16.3057 20C17.2834 20 18.1178 19.2932 18.2785 18.3288L20 8M10 10H14M12 20V22" fill="none"/>
    </svg>
  )
}
