import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Compass({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12C23 17.937 17.937 23 12 23C6.063 23 1 17.937 1 12C1 6.063 6.063 1 12 1C17.937 1 23 6.063 23 12ZM17.9487 7.3162L15.4487 14.8162C15.3491 15.1148 15.1148 15.3491 14.8162 15.4487L7.3162 17.9487C6.5345 18.2093 5.7907 17.4655 6.0513 16.6838L8.5513 9.1838C8.6509 8.8852 8.8852 8.6509 9.1838 8.5513L16.6838 6.0513C17.4655 5.7907 18.2093 6.5345 17.9487 7.3162Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
