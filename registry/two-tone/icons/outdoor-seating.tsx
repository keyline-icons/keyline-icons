import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function OutdoorSeating({ size = 24, ...props }: IconProps) {
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
      <path d="M12 9L2.1758 9C1.578 9 1.0934 8.5154 1.0934 7.9177C1.0934 7.6645 1.1822 7.4193 1.3443 7.2248L3.0309 5.2009C5.2491 2.5391 8.535 1 12 1C15.465 1 18.7509 2.5391 20.9691 5.2009L22.6557 7.2248C22.8178 7.4193 22.9066 7.6645 22.9066 7.9177C22.9066 8.5154 22.422 9 21.8242 9L12 9Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 8L2.1758 8C2.106 8 2.0678 7.9186 2.1125 7.865L3.7991 5.8411C5.8273 3.4072 8.8318 2 12 2C15.1682 2 18.1727 3.4072 20.2009 5.8411L21.8875 7.865C21.9322 7.9186 21.894 8 21.8242 8ZM12 8L12 22M7 14L17 14M22 12L22 22M22 18L17.5 18C17.2239 18 17 18.2239 17 18.5L17 22M2 12L2 22M2 18L6.5 18C6.7761 18 7 18.2239 7 18.5L7 22" fill="none"/>
    </svg>
  )
}
