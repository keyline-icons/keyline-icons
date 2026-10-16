import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleArrowUTurnRight({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C17.937 1 23 6.0629 23 12C23 17.937 17.937 23 12 23C6.0629 23 1 17.937 1 12C1 6.0629 6.0629 1 12 1ZM12.1328 7.9218L13.7529 9.5L11.0801 9.5C8.8518 9.5 7 11.2663 7 13.5C7 15.7337 8.8518 17.5 11.0801 17.5L13.1064 17.5L13.1064 15.5L11.0801 15.5C9.9066 15.5 9 14.58 9 13.5C9 12.42 9.9066 11.5 11.0801 11.5L13.7529 11.5L12.1327 13.078L13.5283 14.5116L16.9113 11.2163C17.3142 10.8238 17.3142 10.1762 16.9113 9.7837L13.5284 6.4882L12.1328 7.9218Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
