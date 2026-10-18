import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Hexagon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12.4767 1.1209L21.4767 6.0018C21.7992 6.1767 22 6.514 22 6.8809L22 17.1191C22 17.486 21.7992 17.8233 21.4767 17.9982L12.4767 22.8791C12.3304 22.9584 12.1665 23 12 23C11.8335 23 11.6696 22.9584 11.5233 22.8791L2.5233 17.9982C2.2008 17.8233 2 17.486 2 17.1191L2 6.8809C2 6.514 2.2008 6.1767 2.5233 6.0018L11.5233 1.1209C11.6696 1.0416 11.8335 1 12 1C12.1665 1 12.3304 1.0416 12.4767 1.1209Z" fill="currentColor"/>
    </svg>
  )
}
