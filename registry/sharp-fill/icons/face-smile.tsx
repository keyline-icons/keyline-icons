import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FaceSmile({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1C18.0751 1 23 5.9249 23 12ZM10 9L8 9L8 12L10 12L10 9ZM16 9L14 9L14 12L16 12L16 9ZM8 15.4142L8.2929 15.7071C9.4019 16.8161 10.6412 17.5 12 17.5C13.3588 17.5 14.5981 16.8161 15.7071 15.7071L16 15.4142L14.5858 14L14.2929 14.2929C13.4019 15.1839 12.6412 15.5 12 15.5C11.3588 15.5 10.5981 15.1839 9.7071 14.2929L9.4142 14Z" fill="currentColor"/>
    </svg>
  )
}
