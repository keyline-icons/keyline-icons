import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Layers2Horizontal({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M16.5 1C16.865 1 17.201 1.199 17.376 1.519L22.876 11.519C23.041 11.818 23.041 12.182 22.876 12.481L17.376 22.481C17.201 22.801 16.865 23 16.5 23C16.136 23 15.8 22.801 15.624 22.481L12 15.892L8.376 22.481C8.201 22.801 7.865 23 7.5 23C7.136 23 6.8 22.801 6.624 22.481L1.124 12.481C0.96 12.182 0.96 11.818 1.124 11.519L6.624 1.519L6.698 1.404C6.885 1.152 7.181 1 7.5 1C7.865 1 8.201 1.199 8.376 1.519L12 8.107L15.624 1.519L15.698 1.404C15.885 1.152 16.181 1 16.5 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 10.182L7.5 2L2 12L7.5 22L12 13.818M22 12L16.5 22L11 12L16.5 2L22 12Z"/>
    </svg>
  )
}
