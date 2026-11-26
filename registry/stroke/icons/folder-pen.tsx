import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FolderPen({ size = 24, ...props }: IconProps) {
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
      <path d="M8.2464 20L6 20C4.3431 20 3 18.6569 3 17L3 7C3 5.3431 4.3431 4 6 4L8.6716 4C9.202 4 9.7107 4.2107 10.0858 4.5858L11.4142 5.9142C11.7893 6.2893 12.298 6.5 12.8284 6.5L18 6.5C18.7935 6.5 19.5151 6.8081 20.0516 7.3111M20.4142 14.6329L16.255 18.792C16.2001 18.8469 16.1332 18.8883 16.0596 18.9128L12.8776 19.9735C12.4867 20.1038 12.1149 19.7319 12.2452 19.341L13.3058 16.159C13.3304 16.0854 13.3717 16.0185 13.4266 15.9636L17.5858 11.8044C17.9609 11.4294 18.4696 11.2186 19 11.2186C20.1046 11.2186 21 12.1141 21 13.2186C21 13.7491 20.7893 14.2578 20.4142 14.6329Z"/>
    </svg>
  )
}
