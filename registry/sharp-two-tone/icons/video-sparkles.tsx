import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function VideoSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M16 14L16 22L2 22L2 13L7 13M16 16L22 13L22 22L16 19M8 6.5C8 7.8807 6.8807 9 5.5 9C4.1193 9 3 7.8807 3 6.5C3 5.1193 4.1193 4 5.5 4C6.8807 4 8 5.1193 8 6.5Z"/>
      <path d="M15.5492 1.3739L16.4196 3.5804L18.6261 4.4508C18.8518 4.5397 19 4.7576 19 5C19 5.2424 18.8518 5.4603 18.6261 5.5492L16.4196 6.4196L15.5492 8.6261C15.4603 8.8518 15.2424 9 15 9C14.7576 9 14.5397 8.8518 14.4508 8.6261L13.5804 6.4196L11.3739 5.5492C11.1482 5.4603 11 5.2424 11 5C11 4.7576 11.1482 4.5397 11.3739 4.4508L13.5804 3.5804L14.4508 1.3739C14.5397 1.1482 14.7576 1 15 1C15.2424 1 15.4603 1.1482 15.5492 1.3739Z" fill="currentColor" stroke="none"/>
      <path d="M11.8433 10.2337L12.3873 11.6127L13.7663 12.1567C13.9074 12.2123 14 12.3485 14 12.5C14 12.6515 13.9074 12.7877 13.7663 12.8433L12.3873 13.3873L11.8433 14.7663C11.7877 14.9074 11.6515 15 11.5 15C11.3485 15 11.2123 14.9074 11.1567 14.7663L10.6127 13.3873L9.2337 12.8433C9.0926 12.7877 9 12.6515 9 12.5C9 12.3485 9.0926 12.2123 9.2337 12.1567L10.6127 11.6127L11.1567 10.2337C11.2123 10.0926 11.3485 10 11.5 10C11.6515 10 11.7877 10.0926 11.8433 10.2337Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
