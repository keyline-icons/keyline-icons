import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SettingsDot({ size = 24, ...props }: IconProps) {
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
      <path d="M17.306 11.29V12.84L19.998 15.36L19.141 17.59C18.771 18.24 17.982 18.51 17.3 18.22L14.859 17.16L13.445 18L12.955 22H9.042L8.553 18L7.138 17.17L3.505 18.73L2 15.36L4.693 12.71V11.16L2 8.64L2.857 6.41C3.227 5.76 4.016 5.49 4.698 5.78L7.138 6.83L8.553 6L9.042 2H12.955M10.999 9.5C12.38 9.5 13.499 10.62 13.499 12C13.499 13.38 12.38 14.5 10.999 14.5C9.618 14.5 8.499 13.38 8.499 12C8.499 10.62 9.618 9.5 10.999 9.5ZM18.999 2C20.656 2 21.999 3.34 21.999 5C21.999 6.66 20.656 8 18.999 8C17.342 8 15.999 6.66 15.999 5C15.999 3.34 17.342 2 18.999 2Z"/>
    </svg>
  )
}
