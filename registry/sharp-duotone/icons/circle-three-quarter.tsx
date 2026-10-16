import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleThreeQuarter({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C17.937 1 23 6.0629 23 12C23 17.937 17.937 23 12 23C6.0629 23 1 17.937 1 12C1 6.0629 6.0629 1 12 1Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M12 5L12 12L5 12C5 13.3845 5.4105 14.7378 6.1797 15.889C6.9489 17.0401 8.0421 17.9373 9.3212 18.4672C10.6003 18.997 12.0078 19.1356 13.3656 18.8655C14.7235 18.5954 15.9708 17.9287 16.9497 16.9497C17.9287 15.9708 18.5954 14.7235 18.8655 13.3656C19.1356 12.0078 18.997 10.6003 18.4672 9.3212C17.9373 8.0421 17.0401 6.9489 15.889 6.1797C14.7378 5.4105 13.3845 5 12 5Z" fill="currentColor"/>
    </svg>
  )
}
