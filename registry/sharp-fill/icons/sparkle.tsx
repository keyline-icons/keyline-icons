import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sparkle({ size = 24, ...props }: IconProps) {
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
      <path d="M12.9122 2.5903L15.5461 8.4539L21.4097 11.0878C21.7689 11.2491 22 11.6062 22 12C22 12.3938 21.7689 12.7509 21.4097 12.9122L15.5461 15.5461L12.9122 21.4097C12.7509 21.7689 12.3938 22 12 22C11.6062 22 11.2491 21.7689 11.0878 21.4097L8.4539 15.5461L2.5903 12.9122C2.2311 12.7509 2 12.3938 2 12C2 11.6062 2.2311 11.2491 2.5903 11.0878L8.4539 8.4539L11.0878 2.5903C11.2491 2.2311 11.6062 2 12 2C12.3938 2 12.7509 2.2311 12.9122 2.5903Z" fill="currentColor"/>
    </svg>
  )
}
