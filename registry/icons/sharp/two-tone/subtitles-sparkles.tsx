import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SubtitlesSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M6.03 20L2 20L2 4L13 4M22 10L22 20L17.97 20M5 10L9 10M11 10L16 10M5 14L13 14M15 14L19 14"/>
      <path d="M19.5492 1.3739L20.4196 3.5804L22.6261 4.4508C22.8518 4.5397 23 4.7576 23 5C23 5.2424 22.8518 5.4603 22.6261 5.5492L20.4196 6.4196L19.5492 8.6261C19.4603 8.8518 19.2424 9 19 9C18.7576 9 18.5397 8.8518 18.4508 8.6261L17.5804 6.4196L15.3739 5.5492C15.1482 5.4603 15 5.2424 15 5C15 4.7576 15.1482 4.5397 15.3739 4.4508L17.5804 3.5804L18.4508 1.3739C18.5397 1.1482 18.7576 1 19 1C19.2424 1 19.4603 1.1482 19.5492 1.3739Z" fill="currentColor" stroke="none"/>
      <path d="M11.8433 18.2337L12.3873 19.6127L13.7663 20.1567C13.9074 20.2123 14 20.3485 14 20.5C14 20.6515 13.9074 20.7877 13.7663 20.8433L12.3873 21.3873L11.8433 22.7663C11.7877 22.9074 11.6515 23 11.5 23C11.3485 23 11.2123 22.9074 11.1567 22.7663L10.6127 21.3873L9.2337 20.8433C9.0926 20.7877 9 20.6515 9 20.5C9 20.3485 9.0926 20.2123 9.2337 20.1567L10.6127 19.6127L11.1567 18.2337C11.2123 18.0926 11.3485 18 11.5 18C11.6515 18 11.7877 18.0926 11.8433 18.2337Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
