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
      <path d="M4.929 4.929C3.1193 6.7386 2 9.2386 2 12C3.25 10 5.75 10 7 12C8.25 10 10.75 10 12 12M12 12V19C12 20.6569 13.3431 22 15 22C16.6569 22 18 20.6569 18 19C18 18.5526 17.8999 18.1108 17.7071 17.7071M8.3456 2.6888C9.4776 2.2442 10.7103 2 12 2C17.5228 2 22 6.4772 22 12C20.8357 10.1371 18.5868 10.0094 17.2738 11.617M2 2L22 22"/>
    </svg>
  )
}
