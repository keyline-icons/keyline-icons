import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Ruler({ size = 24, ...props }: IconProps) {
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
      <path d="M1.293 17.05C1.105 16.863 1 16.608 1 16.343C1 16.078 1.105 15.824 1.293 15.636L15.636 1.293C15.824 1.105 16.078 1 16.343 1C16.608 1 16.863 1.105 17.05 1.293L22.707 6.95C22.895 7.137 23 7.392 23 7.657C23 7.922 22.895 8.176 22.707 8.364L8.364 22.707C8.176 22.895 7.922 23 7.657 23C7.392 23 7.137 22.895 6.95 22.707L1.293 17.05ZM6.343 13.414L4.929 14.828L7.757 17.657L9.172 16.243L6.343 13.414ZM9.172 10.586L7.757 12L9.525 13.768L10.939 12.354L9.172 10.586ZM12 7.757L10.586 9.172L13.414 12L14.828 10.586L12 7.757ZM14.828 4.929L13.414 6.343L15.182 8.111L16.596 6.697L14.828 4.929Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
